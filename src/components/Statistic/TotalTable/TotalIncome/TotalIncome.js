import React from "react";
import s from './TotalIncome.module.css';
import HocValuta from "../../../HOC/HocValuta";
import { DataTransformation } from "../../../helpers/DataTransformation/DataTransformation";
import Message from "../../../helpers/Message/Message";
import { Table } from "antd";
import moment from 'moment';
import Converter_V_RGB from "../../../helpers/converter/converter";
import {CloseCircleOutlined} from '@ant-design/icons';
import { coefficientFunc } from "../../../helpers/CoefficientFunc";


const TotalIncome = (props) => {


    // фильтрую в зависимости от выбранного периода
    let result =
        props.income.data.map(a => {
            return {
                name: a.name,
                color: a.color,
                data: a.data.filter(b => b.created >= (props.periodS || props.todayS)
                    && b.created <= (props.periodPo || props.todayPo))
            }
        })



    let newResult = result.map(a => a.data.map(d => {
        return {
            name: a.name, created: d.created, amount: d.amount, id: d.id, color: a.color
        }
    }))


    let total = newResult[0].concat(
        newResult[1] ? newResult[1] : [],
        newResult[2] ? newResult[2] : []
    )

    let totalSort = total.sort((a, b) => a.created > b.created ? 1 : -1)

    const deleteHandler =(e)=> {
        props.setVisible(true)
        props.setIdDelet(e.currentTarget.parentNode.id)
        }
         
        const coefficient = coefficientFunc(
            props.diagramm.tableTotalSelectValuta, 
            props.diagramm.exchangeRates.dollar.Cur_OfficialRate, 
            props.diagramm.exchangeRates.euro.Cur_OfficialRate, 
            props.diagramm.exchangeRates.ruble.Cur_OfficialRate, 
            ) 

    const columns = [
        {
            title: 'Доход',
            dataIndex: 'name',
            key: 'name',
            align:'center',
            sorter: (a, b) => a.name.length - b.name.length,
            render: (text, record, index) =>
            <div style={{ backgroundColor: `rgba(${Converter_V_RGB(record.color).slice(4, -1)},0.6)`, padding: 8 }}>{text}</div>
        },
        {
            title: 'Дата',
            dataIndex: 'created',
            key: 'created',
            align:'center',
            sorter: (a, b) => moment(a.created) - moment(b.created),
            render: (text, record, index) =>
            <div style={{ backgroundColor: `rgba(${Converter_V_RGB(record.color).slice(4, -1)},0.6)`, padding: 8 }}>{text}</div>
        },
        {
            title: 'Сумма',
            dataIndex: 'amount',
            key: 'amount',
            align:'center',
            sorter: (a, b) => a.amount - b.amount,
            render: (text, record, index) =>
            <div style={{ backgroundColor: `rgba(${Converter_V_RGB(record.color).slice(4, -1)},0.6)`, padding: 8 }}>
                {text}
                <div id={record.id} className={s.delete}>
                <CloseCircleOutlined   title="Удалить запись" onClick={deleteHandler}/>
                </div>
                </div>
        }
    ]
 
    const data = totalSort.map(a=> ({...a, key: a.id, amount: (a.amount/coefficient).toFixed(2)}))

    const totalSumm = total.map(a => a.amount).reduce((sum, current) => sum + current, 0)

    let dateS = DataTransformation(props.periodS || props.todayS)
    let datePo = DataTransformation(props.periodPo || props.todayPo)


    let textMessage =
        `Нет доходов с ${dateS} по ${datePo} ...`

    return (
        <div className={s.statisticDateTable}>

            {totalSort.length !== 0
                ? <div className={s.statisticTable}>

                    <Table
                     rowClassName={s.row}
                        columns={columns}
                        dataSource={data}
                        size="small"
                        pagination={{
                            pageSize: '9'
                        }}
                        bordered
                    />
                    <div className={s.totalSumm}>
                        <div>
                            Всего заработано с {dateS} по {datePo}:
                        </div>
                        <HocValuta
                         tableTotalValuta={props.tableTotalValuta}
                            value='statisticTotal'
                            totalSumm={totalSumm}
                            exchangeRates={props.exchangeRates} />
                    </div>
                </div>
                : <div>
                    <Message textMessage={textMessage} idMessage='messageTableTotal' />
                </div>
            }
        </div>
    )
}

export default TotalIncome