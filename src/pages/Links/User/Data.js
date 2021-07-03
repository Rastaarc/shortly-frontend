export const DataTableColumns = [
    {
        title: 'Original Link',
        dataIndex: 'originalLink',
        key: 'oLink',
        width: '30%',
        ellipsis: true,
        render: txt => <a href={txt} target="_blank" rel="noreferrer">{txt}</a>
    },
    {
        title: 'Short Link',
        dataIndex: 'shortLink',
        key: 'sLink',
        width: '30%',
        ellipsis: true,
        render: txt => <a href={txt} target="_blank" rel="noreferrer">{txt}</a>
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        align: 'center',
        // width: '20%',
        key: 'createdAt',
    },
    {
        title: 'Actions',
        key: 'actions',
        // width: '20%',
        render: (txt, record)=> {
            return (
            <div className="datatable__actions">
                <a href="#i">Edit</a>
                <a href="#i">Delete</a>
            </div>
        )}

    }
]


export const DataTableData = [
    {
        key: 1,
        originalLink: 'https://www.longlonglonglonglonglong.url.com',
        shortLink: 'https:/sht.ly/Testing',
        createdAt: '25th March 2021',
    },
    {
        key: 2,
        originalLink: 'https://www.2222longlonglonglonglonglong.url.com',
        shortLink: 'https:/sht.ly/Testing2',
        createdAt: '11th March 2021',
    },
    {
        key: 3,
        originalLink: 'https://www.3333longlonglonglonglonglong.url.com',
        shortLink: 'https:/sht.ly/Testing3',
        createdAt: '12th March 2021',
    },
    {
        key: 11,
        originalLink: 'https://www.longlonglonglonglonglong.url.com',
        shortLink: 'https:/sht.ly/Testing',
        createdAt: '25th March 2021',
    },
    {
        key: 12,
        originalLink: 'https://www.2222longlonglonglonglonglong.url.com',
        shortLink: 'https:/sht.ly/Testing2',
        createdAt: '11th March 2021',
    },
    {
        key: 13,
        originalLink: 'https://www.3333longlonglonglonglonglong.url.com',
        shortLink: 'https:/sht.ly/Testing3',
        createdAt: '12th March 2021',
    },
    {
        key: 111,
        originalLink: 'https://www.longlonglonglonglonglong.url.com',
        shortLink: 'https:/sht.ly/Testing',
        createdAt: '25th March 2021',
    },
    {
        key: 112,
        originalLink: 'https://www.2222longlonglonglonglonglong.url.com',
        shortLink: 'https:/sht.ly/Testing2',
        createdAt: '11th March 2021',
    },
    {
        key: 113,
        originalLink: 'https://www.3333longlonglonglonglonglong.url.com',
        shortLink: 'https:/sht.ly/Testing3',
        createdAt: '12th March 2021',
    },
    {
        key: 1111,
        originalLink: 'https://www.longlonglonglonglonglong.url.com',
        shortLink: 'https:/sht.ly/Testing',
        createdAt: '25th March 2021',
    },
    {
        key: 1112,
        originalLink: 'https://www.2222longlonglonglonglonglong.url.com',
        shortLink: 'https:/sht.ly/Testing2',
        createdAt: '11th March 2021',
    },
    {
        key: 1113,
        originalLink: 'https://www.3333longlonglonglonglonglong.url.com',
        shortLink: 'https:/sht.ly/Testing3',
        createdAt: '12th March 2021',
    },
    {
        key: 11111,
        originalLink: 'https://www.longlonglonglonglonglong.url.com',
        shortLink: 'https:/sht.ly/Testing',
        createdAt: '25th March 2021',
    },
    {
        key: 11112,
        originalLink: 'https://www.2222longlonglonglonglonglong.url.com',
        shortLink: 'https:/sht.ly/Testing2',
        createdAt: '11th March 2021',
    },
    {
        key: 11113,
        originalLink: 'https://www.3333longlonglonglonglonglong.url.com',
        shortLink: 'https:/sht.ly/Testing3',
        createdAt: '12th March 2021',
    },
]