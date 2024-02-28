import React, {useState} from "react";

const BirthDateComponent = () => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
  
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    return (
        <div className="mb-3">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="birthdate">
            Birthdate
            <span className="text-red-500 font-lato"> *</span>
            </label>
            <div className="flex space-x-2">
            <select 
                className="block w-full px-4 py-2 border border-[#A5B6CD] rounded-md shadow-sm focus:outline-none focus:ring-[#127C95] focus:border-[#127C95] sm:text-sm"
                value={day}
                onChange={(e) => setDay(e.target.value)}
            >
                <option value="">Day</option>
                {days.map((d) => (
                <option key={d} value={d}>{d}</option>
                ))}
            </select>
            <select 
                className="block w-full px-4 py-2 border border-[#A5B6CD] rounded-md shadow-sm focus:outline-none focus:ring-[#127C95] focus:border-[#127C95] sm:text-sm"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
            >
                <option value="">Month</option>
                {months.map((m, index) => (
                <option key={m} value={index + 1}>{m}</option>
                ))}
            </select>
            <select 
                className="block w-full px-4 py-2 border border-[#A5B6CD] rounded-md shadow-sm focus:outline-none focus:ring-[#127C95] focus:border-[#127C95] sm:text-sm"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            >
                <option value="">Year</option>
                {years.map((y) => (
                <option key={y} value={y}>{y}</option>
                ))}
            </select>
            </div>
        </div>
    )
}
export default BirthDateComponent;