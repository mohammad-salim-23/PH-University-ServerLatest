export type TMonths = 'January' | 'February' | 
'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
export type TAcademicSemesterName = 'Autumn'|'Summer'|'Fall';
export type TAcademicSemesterCode = '01'|'02'|'03';
export type TAcademicSemester={
    name:'Autumn'|'Summer'|'Fall';
    code:'01'|'02'|'03';
    year:Date;
    startMonth:TMonths,
    endMonth:TMonths
}