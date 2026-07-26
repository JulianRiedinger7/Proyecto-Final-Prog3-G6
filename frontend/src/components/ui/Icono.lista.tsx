interface IconoProps {
    faIcono:string;
}

export function IconoLista ({faIcono}:IconoProps) {
    return (<div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center">
                <span className={`fa-solid ${faIcono} text-sm`}></span>
            </div>)
}