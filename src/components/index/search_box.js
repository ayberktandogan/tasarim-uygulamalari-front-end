import { cloneElement, createContext, forwardRef, useContext, useRef, useEffect, Children, isValidElement } from 'react'
import { ListSubheader, TextField, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab'
import useStyles from './search_box.styles'
import { VariableSizeList } from 'react-window';
import PropTypes from 'prop-types'

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
    const { data, index, style } = props;
    return cloneElement(data[index], {
        style: {
            ...style,
            top: style.top + LISTBOX_PADDING,
        },
    });
}

const OuterElementContext = createContext({});

const OuterElementType = forwardRef((props, ref) => {
    const outerProps = useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current != null) {
            ref.current.resetAfterIndex(0, true);
        }
    }, [data]);
    return ref;
}

// Adapter for react-window
const ListboxComponent = forwardRef(function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = Children.toArray(children);
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child) => {
        if (isValidElement(child) && child.type === ListSubheader) {
            return 48;
        }

        return itemSize;
    };

    const getHeight = () => {
        if (itemCount > 8) {
            return 8 * itemSize;
        }
        return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    itemData={itemData}
                    height={getHeight() + 2 * LISTBOX_PADDING}
                    width="100%"
                    ref={gridRef}
                    outerElementType={OuterElementType}
                    innerElementType="ul"
                    itemSize={(index) => getChildSize(itemData[index])}
                    overscanCount={5}
                    itemCount={itemCount}
                >
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});

ListboxComponent.propTypes = {
    children: PropTypes.node,
};

const renderGroup = (params) => [
    <ListSubheader key={params.key} component="div">
        {params.group}
    </ListSubheader>,
    params.children,
];


export default function SearchBox(props) {
    const { SCHOOL_LIST, setSelectedSchool } = props
    const classes = useStyles()

    function _handleInputChange(event, value) {
        setSelectedSchool(value)
    }

    return (
        <Autocomplete
            id="school-list"
            fullWidth
            disableListWrap
            autoHighlight
            classes={classes}
            ListboxComponent={ListboxComponent}
            renderGroup={renderGroup}
            getOptionLabel={option => option.name}
            options={SCHOOL_LIST}
            onChange={_handleInputChange}
            groupBy={(option) => option.name[0].toUpperCase()}
            renderInput={(params) => <TextField {...params} variant="outlined" label="Okul Listesi" />}
            renderOption={(option) => <Typography noWrap>{option.name}</Typography>}
        />
    )
}

SearchBox.propTypes = {
    SCHOOL_LIST: PropTypes.array.isRequired,
    setSelectedSchool: PropTypes.func.isRequired
}