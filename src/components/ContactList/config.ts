interface HeadCell {
    id: string;
    label: string;
    isAction: boolean;
}

export const headCells: readonly HeadCell[] = [
    {
        id: 'contactName',
        isAction: false,
        label: 'Contact Name',
    },
    {
        id: 'age',
        isAction: false,
        label: 'Age',
    },
    {
        id: 'action',
        isAction: true,
        label: 'Action',
    },
];
