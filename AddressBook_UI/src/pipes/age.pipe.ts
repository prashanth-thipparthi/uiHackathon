import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name : "age"
})
export class AgePipe implements PipeTransform
{
    transform(dob: string, flag: number = 1): string {
        if (!dob) return "";
        let dt = new Date(dob);
        let diff = Date.now() - dt.getTime();
        dt = new Date(diff);
        let y, m, d;
        y = dt.getFullYear() - 1970;
        m = dt.getMonth();
        d  = dt.getDate();

        switch(flag)
        {
            case 2: return `${y} years and ${m} months`;
            case 3: return `${y} years, ${m} months and ${d} days`;
            default: return `${y} years`
        }
    }
    
}