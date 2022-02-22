import { Profiler, proCB } from '../util/Profiler';

export const SiteFooter = () => {
    const date = new Date();
    return (
        <footer>
            <Profiler id="Footer" onRender={proCB} />
            <div>
                <p>Copyright &copy; {date.getFullYear()} Chris Johannesson</p>
                <p>A web shop project with a react and bootstrap front-end and a expressjs and mongodb back-end.</p>
            </div>
        </footer>
    );
}