const $ = <T extends HTMLElement>(query: string, forEach?: ((arg0: T, arg1: number) => void) | undefined) => {
    const all = document.querySelectorAll(query)!;
    
    if (forEach) all.forEach((el, index) => forEach(el as T, index));
    
    return all.item(0) as T;
};

export default $;