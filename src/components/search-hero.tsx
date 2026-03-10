export function SearchHero() {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto py-0 space-y-1 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <img
                src="/xcaret-logo.png"
                alt="Xcaret"
                className="h-36 md:h-44 w-auto"
            />
            <p
                className="text-base md:text-lg max-w-xl mx-auto px-4"
                style={{
                    fontFamily: '"Inter", "Host Grotesk", sans-serif',
                    fontWeight: 300,
                    letterSpacing: '-0.01em',
                    lineHeight: '120%',
                    color: 'rgb(17, 89, 122)'
                }}
            >
                Descubre los parques y experiencias únicas del Grupo Xcaret en la Riviera Maya — naturaleza, cultura y aventura en el corazón del Caribe mexicano.
            </p>
        </div>
    );
}
