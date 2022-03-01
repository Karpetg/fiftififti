import React from 'react';
import s from './Main.module.css';
import GeneralInformation from './GeneralInformation/GeneralInformation';
import { connect } from 'react-redux';
import {
    addDiagramm, addActiv, addSalary,
    addSelectDiagramm, addSalaryValueTrue, addEditColor,
    getDollarUpdate, getEuroUpdate
} from '../../../Redux/diagrammReducer';
import DiagrammMain from './DiagrammMain/DiagrammMain';
import { addText, addIncome } from './../../../Redux/diagrammReducer';


const Main = (props) => {

    return (
        <div className={s.main}>

            <div className={s.mainInform}>
                <GeneralInformation
                    exchangeRates={props.diagramm.exchangeRates}
                    addDiagramm={props.addDiagramm}
                    diagramm={props.diagramm}
                    addSalary={props.addSalary}
                    getEuroUpdate={props.getEuroUpdate}
                    getDollarUpdate={props.getDollarUpdate}
                    addSalaryValueTrue={props.addSalaryValueTrue}
                    addText={props.addText}
                    addIncome={props.addIncome}
                />
            </div>

            <div className={s.mainDiagramm}>
                <DiagrammMain
                    addText={props.addText}
                    addSelectDiagramm={props.addSelectDiagramm}
                    diagramm={props.diagramm}
                    addEditColor={props.addEditColor} />
            </div>


        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        diagramm: state.expenses
    }
}

export default connect(mapStateToProps,
    {
        addDiagramm, addActiv, addSalary, addSelectDiagramm,
        addSalaryValueTrue, addEditColor, getDollarUpdate, getEuroUpdate, addText, addIncome
    })(Main)




