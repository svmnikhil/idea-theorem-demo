import React, {useEffect, useState, useRef} from "react";

const BirthDateComponent = ({ setDate, error, reset }) => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [hasUserSelected, setHasUserSelected] = useState(false);
    const isInitialMount = useRef(true);
  
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    const dispatchDateChangeEvent = () => {
        if(hasUserSelected) {
            const formattedDay = day || '';
            const formattedMonth = month || '';
            const formattedYear = year || '';
    
            // synthetic event object
            const syntheticEvent = {
                target: {
                    name: "date_of_birth",
                    value: `${formattedDay}-${formattedMonth}-${formattedYear}`
                }
            };
            // console.log(syntheticEvent);
            setDate(syntheticEvent);
        }
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            dispatchDateChangeEvent();
        }
    }, [day, month, year]);

    useEffect(() => {
        if (reset) {
            setDay('');
            setMonth('');
            setYear('');
            setHasUserSelected(false);
        }
    }, [reset]);


    const handleDayChange = (e) => {
        setDay(e.target.value);
        setHasUserSelected(true);
    };
    const handleMonthChange = (e) => {
        setMonth(e.target.value);
        setHasUserSelected(true);
    };
    const handleYearChange = (e) => {
        setYear(e.target.value);
        setHasUserSelected(true);
    };

    return (
        <div className="flex flex-col mb-3">
            <label className="block text-gray-700 font-bold mb-2 text-sm" htmlFor="birthdate">
            Birthdate
            <span className="text-red-500"> *</span>
            </label>
            <div className="flex justify-between space-x-1 md:space-x-2">
                <select 
                    className="flex-1 appearance-none form-select bg-no-repeat bg-transparent pl-4 py-3 border border-[#A5B6CD] rounded-md 
                    focus:outline-none focus:ring-[#127C95] focus:border-[#127C95] text-sm max-w-[30%]"
                    value={day}
                    onChange={handleDayChange}
                >
                    <option value="">Day</option>
                    {days.map((d) => (
                    <option key={d} value={d}>{d}</option>
                    ))}
                </select>
                <select 
                    className="flex-1 appearance-none form-select bg-no-repeat bg-transparent pl-4 border border-[#A5B6CD] rounded-md
                    focus:outline-none focus:ring-[#127C95] focus:border-[#127C95] text-sm max-w-[30%]"
                    value={month}
                    onChange={handleMonthChange}
                >
                    <option value="">Month</option>
                    {months.map((m, index) => (
                    <option key={m} value={index + 1}>{m}</option>
                    ))}
                </select>
                <select 
                    className="flex-1 appearance-none form-select bg-no-repeat bg-transparent pl-4 border border-[#A5B6CD] rounded-md 
                    focus:outline-none focus:ring-[#127C95] focus:border-[#127C95] text-sm max-w-[30%]"
                    value={year}
                    onChange={handleYearChange}
                >
                    <option value="">Year</option>
                    {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>
            <p className="text-red-500 font-lato text-xs">{error}</p>
        </div>
    )
}
export default BirthDateComponent;