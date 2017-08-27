import React from "react";
import {compose} from "redux";
import {injectIntl} from "react-intl";
import ReactDataGrid from "react-data-grid";
import {Toolbar, Data} from "react-data-grid-addons";
import {connect} from "react-redux";

import columnMessages from "./ColumnMessage";
import {registerGrid, sortColumn} from "./Action";
import reducer, {gridSelector} from "./Reducer";

const filterRecords = (filters) => {
    return (records) => Data.Selectors.getRows({
        "rows": records,
        filters
    });
};

const sortDirection = {
    "ascending": "ASC",
    "descending": "DESC",
    "none": "NONE"
};

const sortRecords = (column, direction) => {
    if (column && direction) {
        const comparer = (left, right) => {
            if (direction === sortDirection.ascending) {
                return (left[column] > right[column]) ? 1 : -1;
            } else if (direction === sortDirection.descending) {
                return (left[column] < right[column]) ? 1 : -1;
            } else {
                return 0;
            }
        };

        return (records) => direction ?
            records.slice().sort(comparer) :
            records;
    } else {
        return (records) => records;
    }
};

export const columnType = {"integer": "integer"};

const mapRecords = (columnModels) => (records) => {
    return records.map((record) => {
        const newRecord = Object.create(null);

        columnModels.forEach(({key, mapper}) => {
            const value = record[key];

            if (typeof mapper === "function") {
                newRecord[key] = parseInt(value, 10);
            } else {
                switch (mapper) {
                case columnType.integer:
                    newRecord[key] = parseInt(value, 10);
                    break;
                default:
                    newRecord[key] = value;
                    break;
                }
            }
        });

        return newRecord;
    });
};

const namingNormalizer = (key) => key.replace(
    /-([a-z])/g,
    (value) => value[1].toUpperCase());

const normalizeRecordKeys = (normalizer) => (records) =>
    records.map((record) => {
        const newRecord = Object.create(null);

        Object.keys(record).forEach((key) => {
            const newKey = normalizer(key);

            newRecord[newKey] = record[key];
        });

        return newRecord;
    });


const Grid = injectIntl(class BaseGrid extends React.Component {
    componentWillMount() {
        if (!this.props._gridProps.registered) {
            this.props._grid.onMount(this.props);
        }
    }

    render() {
        if (this.props._gridProps.registered) {
            const {
                intl,
                data,
                columns,
                "_gridProps": {
                    "sorting": {
                        "column": sortColumnName,
                        "direction": sortColumnDirection
                    },
                    filters
                },
                "_grid": {onSort}
            } = this.props;

            const columnModels = columns.map((column) => {
                const {key} = column;

                return {
                    key,
                    "name": columnMessages[key] ?
                        intl.formatMessage(columnMessages[key]) :
                        key,
                    "sortable": true,
                    "filterable": true
                };
            });

            const rows = compose(
                sortRecords(sortColumnName, sortColumnDirection),
                filterRecords(filters),
                mapRecords(columns),
                normalizeRecordKeys(namingNormalizer)
            )(data);

            return (
                <ReactDataGrid
                    columns={columnModels}
                    rowGetter={(index) => rows[index]}
                    rowsCount={rows.length}
                    toolbar={(<Toolbar enableFilter />)}
                    onGridSort={onSort}
                />
            );
        } else {
            return null;
        }
    }
});

export {reducer};

export default connect(
    (state, props) => ({"_gridProps": gridSelector(props.gridKey)(state)}),
    (dispatch, props) => ({
        "_grid": {
            "onMount": (_currentProps) =>
                dispatch(registerGrid(props.gridKey)),
            "onSort": (column, direction) =>
                dispatch(sortColumn(props.gridKey, column, direction))
        }
    })
)(Grid);
