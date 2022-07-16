import * as style from '../styles/credits.module.css'

function ListDecomposed(props) {
    return (
        <div>
            {
                function () {
                    let out = [];
                    for (let line of props.names.split("\n")) {
                        out.push(
                            <div>{line}</div>
                        )
                    }
                    return out;
                }()
            }
        </div>
    )
}

export default function Credits() {
    return (
        <div className={style.credits}>
            <ListDecomposed 
                names = {`Ryan Chang
                    Lucy Ma
                    `}
                />
        </div>
    )
}