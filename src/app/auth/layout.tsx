const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-cream relative overflow-hidden">
            <div className="glow-border" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-amber/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            <div className="z-10 w-full px-4 flex justify-center">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout;