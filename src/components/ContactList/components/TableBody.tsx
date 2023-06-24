import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { ContactWithID } from '../../../types/Contact';
import palette from '../../../theme/palette';

interface ContactListProps {
    data: ContactWithID[];
    handleOpen: (id: string) => () => void;
    handleOpenDelete: (id: string) => () => void;
}

const ContactTableBody = (props: ContactListProps) => {
    const { data, handleOpen, handleOpenDelete } = props;
    
    return (
        <TableBody>
            {(data || []).map((row, index) => {
                const labelId = `table-row-${index}`;
                const updateBtnId = `update-button-row-${index}`;

                return (
                    <TableRow key={labelId} hover tabIndex={-1}>
                        <TableCell align='left'>
                            <Stack spacing={2} direction='row'>
                                <Avatar src={row.photo} />
                                <Typography
                                    sx={{
                                        padding: '10px 10px 10px 0',
                                        display: 'table-cell',
                                        verticalAlign: 'middle',
                                    }}
                                >
                                    {`${row.firstName} ${row.lastName}`}
                                </Typography>
                            </Stack>
                        </TableCell>
                        <TableCell align='right'>{row.age}</TableCell>
                        <TableCell align='right'>
                            <Stack
                                spacing={2}
                                direction='row'
                                justifyContent='end'
                            >
                                <Button
                                    data-testid={updateBtnId}
                                    onClick={handleOpen(row.id)}
                                    sx={{ color: palette.text.link }}
                                >
                                    Update
                                </Button>
                                <Button
                                    onClick={handleOpenDelete(row.id)}
                                    sx={{ color: palette.text.link }}
                                >
                                    Delete
                                </Button>
                            </Stack>
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
};

export default ContactTableBody;
