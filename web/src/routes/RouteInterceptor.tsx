import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useBlocker, useLocation } from "react-router-dom";

export default function RouteInterceptor() {
    const location = useLocation();
    const prevPath = useRef(location.pathname);
    const dispatch = useDispatch();



    useEffect(() => {
        if (location.pathname !== prevPath.current) {
            // rota está prestes a mudar
            prevPath.current = location.pathname;
        }
    }, [location.pathname]);


    const blocker = useBlocker(false)
    useEffect(() => {
        if (blocker.state === "blocked") {
            const confirmed = window.confirm("Você realmente deseja sair desta página?");

            if (confirmed) {
                blocker.proceed();  // libera a navegação
                prevPath.current = blocker.location.pathname;
            } else {
                blocker.reset();    // cancela a navegação
            }
        }
    }, [blocker]);

    return null;
}
