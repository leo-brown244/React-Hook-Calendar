import React , {useState} from 'react'
import { useAlert } from "react-alert";
import as from './Calendar.css'

const months = ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "July" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"]
const days = ["SUNDAY" , "MONDAY" , "TUESDAY" , "WEDNSDAY" , "THURSDAY" , "FRIDAY" , "SATURDAY"]
const getDaysInMonth = (month,year) => {
 return new Date(year, month, 0).getDate();
};
const generateDate = (i , j , m , y) =>{
    const date = new Date(y , m ,1);
    const lastDay = getDaysInMonth(m, y)
    const lastDay1 = getDaysInMonth(m + 1  , y)
    let dd = 7 * i - date.getDay() + j + 1;
    if(dd>lastDay1)
        dd = dd - lastDay1
    if(dd<1)
        dd = lastDay + dd;
    
    return dd <=9 ? "0" + dd : dd ;
}
const beautyDate = (d) =>{
    return d <=9 ? "0" + d : d ;
}
export default function Calendar() {
    const today = new Date();
    const [currentDay , setCurrentDay] = useState(today.getDay());
    const [currentDate , setCurrentDate] = useState(today.getDate());
    const [currentMonth , setCurrentMonth] = useState(today.getMonth() + 1);
    const [currentYear , setCurrentYear] = useState(today.getFullYear());
    const [selectedDate , setSelectedDate] = useState(today);
    const alert = useAlert();
    const monthArray = [];  
    for(let i = 1 ; i <= 12 ; i ++)
    {
        monthArray.push(currentMonth == i ? <strong className='month-hover  month-color' onClick={() => changeMonth(i)}>{months[i-1]}</strong>: <div className='month-hover' onClick={() => changeMonth(i)}>{months[i-1]}</div>)
    }
    
    let monthDateArray = [6];
        for(let i = 0 ; i < 6 ; i ++)
    {
        monthDateArray[i] = [];
        let dateArray = []
        for(let j = 0 ; j < 7 ; j ++)
        {
            const firstDate = new Date(currentYear , currentMonth-1 , 1);
            const lastDay  = getDaysInMonth(currentMonth, currentYear)
            const calDate = generateDate(i , j , currentMonth -1 , currentYear)
            let activeDate = "";
            if(calDate === beautyDate(selectedDate.getDate()) && currentMonth === selectedDate.getMonth() + 1 && currentYear === selectedDate.getFullYear())
                activeDate = "activeDate"
            if(i*7 + j < firstDate.getDay() || i*7 + j - firstDate.getDay() >= lastDay)
                dateArray.push(<div className="calDateDiv"><span className={"grey"} >{calDate}</span></div>)
            else 
                dateArray.push(<div className="calDateDiv"><span className={activeDate + " calDate"} onClick={()=>selectDate(calDate)}>{calDate}</span></div>)
        }
        monthDateArray[i].push(<div className="week">{dateArray} </div>)
    }
    
    const changeYear = index =>
    {
        setCurrentYear(currentYear + index)
    }
    const changeMonth = month =>{
        setCurrentMonth(month)
    }
    const selectDate = (d) =>{
        
        let state = new Date(currentYear , currentMonth - 1 , d);
        
        if(state.getTime() + 100000000 >= today.getTime())
        {
            setCurrentDate(d);
            setSelectedDate(state)
            setCurrentDay(state.getDay())
        }
        else
            alert.error("Please select a date later than today.");
    }
    
    return (
         <div className="container">
            <div className="calendar-base">
                <div className="year">{currentYear}</div>
                <div className="triangle-left" onClick = {()=>changeYear(-1)}></div>
                <div className="triangle-right" onClick = {()=>changeYear(1)}></div>
                <div className="months">
                    {monthArray}
                </div>
                <hr className="month-line" />
                    <div className="days">
                        <div className="each-day">SUN</div>
                        <div className="each-day">MON</div>
                        <div className="each-day">TUE</div>
                        <div className="each-day">WED</div>
                        <div className="each-day">THU</div>
                        <div className="each-day">FRI</div>
                        <div className="each-day">SAT</div>
                    </div>
                    <div className="num-dates">
                    {monthDateArray}
                </div>
            </div>
            <div className="calendar-left">
                <div className = "calendar-left-text">
                    <div className="num-date">{currentDate}</div>
                    <div className="day">{days[currentDay]}</div>
                </div>
            </div>
        </div>
    )
}
