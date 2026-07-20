interface InputEdicionProps {
    valorActual: string;
    onChange: (nuevoValor: string) => void;
    onGuardar: () => void;
    onCancelar: () => void;
}

export function InputEdicion ({valorActual, onChange, onGuardar, onCancelar}: InputEdicionProps) {
    return (<div className="flex items-center gap-2 flex-1 max-w-md">
                <input type="text" value={valorActual} onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') onGuardar(); if (e.key === 'Escape') onCancelar();
                }} className="w-full bg-blanco text-primary border border-primary font-sans text-sm rounded px-3 py-1.5 focus:outline-none" autoFocus placeholder="Ej. Drama"/>
                <button onClick={onGuardar} className="p-1.5 bg-primary text-blanco rounded hover:bg-primary cursor-pointer flex items-center" title="Guardar">
                    <i className="fa-solid fa-check text-sm"></i>
                </button>
                <button onClick={onCancelar} className="p-1.5 rounded cursor-pointer flex items-center" title="Cancelar">
                    <i className="fa-solid fa-xmark text-sm"></i>
                </button>
            </div>);
}