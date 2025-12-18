export function now() {
    return new Date();
}

export function currentTimeString(): string {
    const date = now();
    const [ h, m, s ] = [ date.getHours(), date.getMinutes(), date.getSeconds() ]
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function addTime(t1: string, t2: string) {
    const time1 = t1.split(":").map(s => Number(s));
    const time2 = t2.split(":").map(s => Number(s));
    
    const result = [ time1[0] + time2[0], time1[1] + time2[1], time1[2] + time2[2] ];
    
    if (result[2] >= 60) {
        result[1] += Math.floor(result[2] / 60);
        result[2] %= 60;
    }

    if (result[1] >= 60) {
        result[0] += Math.floor(result[1] / 60);
        result[1] %= 60;
    }

    return result.map(s => String(s).padStart(2, "0")).join(":");
}

export function subtractTime(t1: string, t2: string) {
    const time1 = t1.split(":").map(s => Number(s));
    const time2 = t2.split(":").map(s => Number(s));
    
    const result = [ time1[0] + -time2[0], time1[1] + -time2[1], time1[2] + -time2[2] ];

    if (result[2] < 0) {
        result[1] += Math.floor(result[2] / 60)
        result[2] = result[2] % 60 + 60;
    }
    
    if (result[1] < 0) {
        result[0] += Math.floor(result[1] / 60)
        result[1] = result[1] % 60 + 60;
    }

    return result.map(s => String(s).padStart(2, "0")).join(":");
}