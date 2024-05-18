const DateUtil = {
    ConvertStringDateToDateForm(date_str){
        if(!date_str){
            return null
        }
        const date = new Date(date_str)
        return DateUtil.PadStartDate(date)
    },
    GetCurrentDate(){
        let date = new Date();
        date = DateUtil.PadStartDate(date)
        return date
    },
    PadStartDate(date){
        date = [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2,'0'),
            String(date.getDate()).padStart(2, '0')
        ].join('-')
        return date
    }
}

export default DateUtil
