import React, {useState} from 'react'
import {Table } from 'antd'
import { FaSearch } from 'react-icons/fa'
import './DataTable.less'

function DataTable(props) {
    const [searchValue, setSearchValue] = useState('')
    const searchHandler = (e)=>{
        e.preventDefault()
        props.searchHandler(searchValue)
    }
    return (
        <>
            <div className="datatable__header">
                <h3 className="title">{props.title}</h3>
                <form className="search__form" onSubmit={(e)=>searchHandler(e)}>
                    <input
                        type="search"
                        placeholder="Search"
                        value={searchValue}
                        onChange={(e)=> setSearchValue(e.target.value)}
                    />
                    <FaSearch className="search__icon"/>
                </form>
            </div>
            <Table
                // scroll={{x: 'max-content'}}
                dataSource={props.data}
                columns={props.column}
                loading={props.loading}
                onChange={props.handler}
                pagination={props.pagination}
                expandable={{
                    expandedRowRender: record =>(
                            <div className="expand">
                                {
                                    record.expand &&
                                    record.expand.map(item=>{
                                        return (
                                            <div key={item.title}>
                                                <p className="text--bold">{item.title}</p>
                                                <span className="primary--text">{item.txt}</span>
                                                <br/><br />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ),
                    rowExpandable: record=> record.expand? true : false

                }}
            />
        </>
    )
}

export default DataTable
