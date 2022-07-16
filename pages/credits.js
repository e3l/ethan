import * as style from '../styles/credits.module.css'

function ListDecomposed(props) {
    return (
        <div className={`${style.section} ${props.label ? style.newsection : ''}`}>
            <div className={style.sectionlabel}>
                <div>{props.label}</div>
            </div>
            <div className={style.sectionlist}>
                {
                    function () {
                        let out = [];
                        for (let line of props.names.split("\n")) {
                            out.push(
                                <div key={line}>{line}</div>
                            )
                        }
                        return out;
                    }()
                }
            </div>
        </div>
    )
}

export default function Credits() {
    return (
        <div className={style.credits}>
            {/* <div>
                THANK YOU TO...
            </div> */}
            <div>
                <ListDecomposed
                    label='ALPACA'
                    names = {`RYAN CHA.
                        LUCY M
                        JEROME W
                        JACK P
                        SALLY L
                        LITA S
                        PATRICK C
                        MICHAEL Z
                        HENRY T
                        RYAN CHO.
                        MYLIE R
                        DANIEL P
                        AIDAN G
                        `}
                    />
            </div>
            <div className={style.split}>
                <div>
                    <ListDecomposed
                        label='KURIO'
                        names = {`SAM D
                        ALBERT C
                        AIDAN L
                        AUSTIN X
                        ADITHYA N
                        KHUE D
                        ALEC P
                        REID D
                        ARTHUR B
                        ETHAN K
                        DANIEL K
                        ANGELA L
                        HOSHI U
                        CLAIRE C
                        JASON Z`}
                    />
                    <ListDecomposed 
                        names={`TRAM P
                        CHI T
                        RYAN S`}
                    />
                    <ListDecomposed 
                        names={`COACH HUNG
                        COACH WEI
                        COACH STEVEN`}
                    />
                    <ListDecomposed 
                        label='POLARIS'
                        names={`YU-TING C
                        SERGEY C
                        MISHA C
                        CINDY W
                        VINCENT C
                        REMY L
                        NEIL P
                        EVA G
                        AUDREY H`}
                    />
                    <ListDecomposed 
                        names={`COACH CHURYUKIN
                        COACH GOYAL
                        COACH LIN
                        COACH CHANG`}
                    />
                    <ListDecomposed 
                        label='FIRST'
                        names={`ALISON S
                        KAILEY H
                        APURVA M
                        JUSTIN W`}
                    />
                    <ListDecomposed 
                        label='FLL'
                        names={`... forgor...`}
                    />
                </div>
                <div>
                    <ListDecomposed 
                        label='GRT'
                        names={`ANSHU J
                        SHIRA G
                        ROSHELLE B
                        OLIVIA V
                        MATTHEW M
                        KEVIN Y
                        KEPLER B
                        HENRY B
                        GEOFFREY N
                        ENZO M
                        ALINA L
                        AIDEN M
                        NOLAN T
                        JULIAN S
                        JACOB O
                        ETHAN F
                        CASEY F
                        `}
                    />
                    <ListDecomposed
                        names = {`AKSHAY P
                        ALANA F
                        ETHAN L
                        ADITYA S
                        SHIR D
                        EVELYN G
                        IPSITA B
                        ALEX F
                        THOMPSON W
                        AARUSH B
                        ARUN G
                        AYAAN F
                        EVAN A
                        MAHIMA A
                        MATTY H
                        NIKHIL C
                        NIMITA M
                        NOAH M
                        OSCAR C
                        QUINCY R
                        TYLER L
                        VASUDA D
                        ZEV A
                        ADITI J
                        DESTINY X`}
                    />
                    <ListDecomposed 
                        names={`BINH-MINH N
                        SERENA L
                        RYAN T
                        KENNETH M
                        JULIETTE K
                        DANIEL L
                        CHRIS M
                        ANNETTA V
                        ANDREW L
                        ALEX T`}
                    />
                    <ListDecomposed 
                        names={`GRANLUND
                        SETH
                        PHIL
                        ZACH`}
                    />
                </div>
            </div>
            <div className={style.split}>
                <div>
                    <ListDecomposed 
                            label='SEC'
                            names={`JUNO K
                            KAYLEE W
                            SCOTT L
                            SUNNY P
                            MELINDA H
                            POOJA B
                            TONI M
                            RUTH J
                            ADELE D
                            MAYA P
                            CHLOE W`}
                        />
                    <ListDecomposed 
                        names={`IRENE K
                        CLARINE K
                        ANIKA S
                        MIA K
                        SOFIA L
                        HESSI
                        SAGE L
                        MONA P
                        STEVE C
                        ANNIKA B
                        KELVIN J
                        ETHAN Z
                        INÉS G
                        JEANNIE C
                        VINCENT B
                        EVAN G`}
                    />
                    <ListDecomposed 
                        names={`AMY S
                        ARUNIM A
                        SUHANI S
                        ANDREW K
                        ROHAN B
                        BELINDA L
                        KATE W
                        LAURYN N
                        CHARLIZE C
                        THOMAS L`}
                    />
                    <ListDecomposed 
                        names={`JOSH M
                        GWEN D
                        TARA D
                        ANJOLINA H
                        ERIN V
                        HANNA S
                        DANIEL C
                        YOYO M
                        PETER O
                        GRACE L
                        ANGELA C
                        ALYSSA P
                        ARLENE C
                        ETHAN S
                        CLAIRE C`}
                    />
                    <ListDecomposed 
                        names={`MRS. HALL`}
                    />
                    <ListDecomposed 
                        label='GEC/BAHSEL'
                        names={`STEPHEN L
                        WHAMS`}
                    />
                </div>
                <div>
                    <ListDecomposed 
                        label="GUNN CO'23"
                        names={`AARON C
                        DEBORAH H
                        HANNAH Q
                        CLAIRE X
                        WILLA B
                        MEGAN M
                        ZIYANA N
                        KYLE R
                        JACQUELINE S
                        ANDY L
                        SAUMYA S
                        SYMA C
                        VINCENT H
                        JUSTIN H
                        POEIMA D
                        AARON N
                        SILVIA A
                        CARLY L
                        ALICIA W
                        NICO C
                        ANNA S
                        DEANNA D
                        VIOLETA S
                        GRACIE E
                        KATIE R
                        KATE N
                        MAYA O
                        LILY B
                        COLIN L
                        JACK F`}
                    />
                    <ListDecomposed 
                        names={`AVA B
                        LIV A
                        JIMMY C
                        PARKER G
                        AYUSH A
                        FAE C
                        JOSEPH K
                        KYRA B
                        NINA L
                        BILL C
                        ANDREW P`}
                    />
                    <ListDecomposed 
                        label='TEACHERS'
                        names={`MR. DEGGELLER
                        MRS. LOREY
                        MR. GLEASON
                        MR. JOHNSON
                        MRS. ZAVACK
                        MR. BROWN
                        MRS. GLEASON
                        MR. PALEY
                        MRS. CATALANO
                        MS. KIM
                        MR. MIGUEL
                        MRS. MOYER
                        MR. CREIGHTON
                        MRS. HOLDENER
                        MRS. WARD`}
                    />
                </div>
            </div>
        </div>
    )
}