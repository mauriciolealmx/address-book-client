import React from 'react';
import classNames from 'classnames';
import { AutoSizer, Column, Table } from 'react-virtualized';

import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';

import styles from './Contacts.styles';

class MuiVirtualizedTable extends React.PureComponent {
  getRowClassName = ({ index }) => {
    const { rowClassName, onRowClick } = this.props;
    // Hover color will only show if rows have a onRowClick callback.
    return classNames(styles.tableRow, styles.flexContainer, rowClassName, {
      [styles.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const { columns, onRowClick, rowHeight } = this.props;
    const isNumeric = (columnIndex && columns[columnIndex].numeric) || false;
    return (
      <TableCell
        className={classNames(styles.tableCell, styles.flexContainer, { [styles.noClick]: onRowClick == null })}
        component="div"
        numeric={isNumeric}
        style={{ height: rowHeight }}
        variant="body"
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { columns, headerHeight } = this.props;
    const isNumeric = (columnIndex && columns[columnIndex].numeric) || false;
    return (
      <TableCell
        className={classNames(styles.tableCell, styles.flexContainer, styles.noClick)}
        component="div"
        numeric={isNumeric}
        style={{ height: headerHeight }}
        variant="head"
      >
        {label}
      </TableCell>
    );
  };

  columnRendered(columns) {
    return columns.map(({ className, dataKey, ...other }, index) => (
      <Column
        key={dataKey}
        headerRenderer={headerProps =>
          this.headerRenderer({
            ...headerProps,
            columnIndex: index,
          })
        }
        className={classNames(styles.flexContainer, className)}
        cellRenderer={this.cellRenderer}
        dataKey={dataKey}
        {...other}
      />
    ));
  }

  render() {
    const { columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={styles.table}
            height={height}
            rowClassName={this.getRowClassName}
            width={width}
            {...tableProps}
          >
            {this.columnRendered(columns)}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

const columnConfig = [
  {
    width: 200,
    flexGrow: 1,
    label: 'Contact',
    dataKey: 'firstName',
  },
  {
    width: 120,
    flexGrow: 1,
    label: 'Name',
    dataKey: 'firstName',
  },
  {
    width: 120,
    flexGrow: 1,
    label: 'Last',
    dataKey: 'lastName',
  },
  {
    width: 120,
    flexGrow: 1,
    label: 'Email',
    dataKey: 'email',
  },
];

export default function VirtualizedContacts(props) {
  const { contacts } = props;
  return (
    <Paper className={styles.paperRoot}>
      <MuiVirtualizedTable
        columns={columnConfig}
        headerHeight={56}
        onRowClick={event => console.log(event)}
        rowCount={contacts.length}
        rowGetter={({ index }) => contacts[index]}
        rowHeight={56}
      />
    </Paper>
  );
}
