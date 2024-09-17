import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    makeStyles
} from '@material-ui/core';
import { Link, LinkButton, } from '@backstage/core-components';
import React from 'react';
import { ReleasePopOverComponent } from "../ReleasePopOverComponent";
import capitalize from 'lodash/capitalize';
import { createSvgIcon } from "@mui/material/utils";


const PlusIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
        />
    </svg>,
    'Plus',
);
const useStyles = makeStyles(() => ({
    headerStyle: {
    borderBottom: '1px solid #d5d5d5',
    borderTop: '1px solid #d5d5d5',
    fontWeight: 700,
    lineHeight: '18px'
    },
    layoutSec: {
        paddingTop: '0',
    },
    commonCellStyle: {
        width: 'auto',
        whiteSpace: 'nowrap'
    },
    customLoadingIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
}
}));
type ScrollableProps = {
    loading: boolean;
    loadMoreData: () => void
    data: any[];
};
export const CustomLoadingIcon = () => {
    return (
        <div className="custom-loading-icon">
            <CircularProgress />
        </div>
    );
};
export const ScrollableTable = ({
                              loading,
                              loadMoreData,
                              data,
                          }: ScrollableProps) => {
    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            loadMoreData();
        }
    };
    const classes = useStyles();

    return (
        <div style={{ position: 'relative' }}>
            {loading && <div className={classes.customLoadingIcon}>
                <CircularProgress/>
            </div>}
            <Paper component={Paper} style={{boxShadow: 'unset'}}>
                <TableContainer style={{height: '850px', overflow: 'auto', borderBottom: 'unset' }} onScroll={handleScroll}>
                <Table stickyHeader  aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.headerStyle}  style={{ width: '1000px'}}>Name</TableCell>
                            <TableCell className={classes.headerStyle}  style={{ width: 'auto', whiteSpace: 'nowrap'}} >Folder</TableCell>
                            <TableCell className={classes.headerStyle}  style={{ width: '180px'}}>Actions</TableCell>
                            <TableCell className={classes.headerStyle}  style={{ width: 'auto', whiteSpace: 'nowrap'}} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell style={{ width: '1000px', lineHeight: '14px' }}> <Link to={row.titleRedirectUri}>{row.title}</Link></TableCell>
                                <TableCell style={{ width: 'auto', whiteSpace: 'nowrap' }}>{capitalize(row.folder)}</TableCell>
                                <TableCell style={{ width: '180px', lineHeight: '14px' }}>
                                    <div style={{width: '150px', height: '40px'}}>
                                        <LinkButton
                                            to={row.newReleaseRedirectUri}
                                            color="default"
                                            variant="outlined"
                                            style={{width: '150px', height: '40px', textTransform: 'none'}}
                                            startIcon={<PlusIcon/>}
                                        >
                                            New Releases
                                        </LinkButton>
                                    </div>
                                </TableCell>
                                <TableCell style={{ width: 'auto', whiteSpace: 'nowrap' }}><ReleasePopOverComponent /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
        </div>
    );
};