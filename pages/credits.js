import React, { useEffect, useRef } from 'react';
import Image from 'next/future/image';

import * as style from '../styles/credits.module.css'
import yourname from '../public/credits.png'
import { useScroll, motion } from 'framer-motion';

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
    const placeholderref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: placeholderref,
        offset: ["start end", "end end"]
    });

    useEffect(() => {
        var lastscroll = 0;

        function scrollLogic() {
            if ((new Date()).getTime() - lastscroll > 1000) {
                window.scrollBy(0, 1);
            }
        }

        function scrollListener() {
            lastscroll = (new Date()).getTime();
        }

        window.addEventListener('wheel', scrollListener);

        var intervalID = setInterval(scrollLogic, 10);

        return () => {
            clearInterval(intervalID);
        }
    }, []);

    return (
        <div className={style.container}>
            <div className={style.credits}>
                {/* <div>
                    THANK YOU TO...
                </div> */}
                <div> 
                    <ListDecomposed
                        label='ALPACA'
                        names={`RYAN CHA.
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
                            names={`SAM D
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
                            names={`AKSHAY P
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
                <div>
                    <ListDecomposed
                        label='PIANO'
                        names={`XIAOXIAO J`}
                    />
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
                            CLAIRE C
                            KENDRICK Y
                            TRINITY C`}
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
                            JACK F
                            NOOR P`}
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
                            ANDREW P
                            LARRY S`}
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
                <div className={style.split}>
                    <div>
                        <ListDecomposed
                            label='JLS'
                            names={`ETHAN B
                            ETHAN T
                            ARTHUR C
                            VINCENT C`}
                        />
                        <ListDecomposed
                            label='STUDENT COUNCIL'
                            names={`COLIN C
                            SAMANTHA L
                            SOPHIA V
                            LAUREN P
                            LUCIAN Z
                            NAYIM B`}
                        />
                        <ListDecomposed
                            label='CONNECTIONS'
                            names={`ZARA W
                            AUDREY G
                            KATHLEEN L
                            ZEPHAN S
                            MAX G
                            ALEC T
                            GRAYDEN D
                            NARISSA M
                            ROCKY L
                            ANIRUDH P
                            STEPHANIE G
                            ARATI P
                            EMMA L
                            DALIA A
                            CAROLINE Z
                            IDDO B
                            JONAS P
                            JAMES K
                            AMITA G
                            KIMI S
                            ETHAN K
                            MATTIA B
                            ANJALI B
                            JERRY X
                            JANET M
                            ARYAN G
                            CALE A
                            KATHERINE L
                            MATTHEW G
                            JACK F
                            GRACE L
                            TEJAS T
                            ANTHONY S
                            GRACE L
                            KENZA A
                            GAVIN C
                            NICO
                            ARUN
                            SIENNA`}
                        />
                        <ListDecomposed
                            label='TEACHERS'
                            names={`MS. LUU
                            MRS. BETTENCOURT
                            MRS. LOHSE
                            MR. PARSONS
                            MRS. MELNICK
                            MRS. DUFFEK
                            MS. FEE
                            MRS. NYGAARD
                            MR. LACAYO
                            MS. LUO
                            MRS. DARBY
                            MR. SHIRLEY
                            MR. WEINER
                            MR. BOOTH
                            MR. MISKE
                            MS. MCKINLAY`}
                        />
                    </div>
                    <div>
                        <ListDecomposed
                            label='KNIGHTS OF NIENTE'
                            names={`PETER C
                            LUCAS T
                            ORION K
                            NATHAN P`}
                        />
                        <ListDecomposed
                            label={`HEMIDEMI SEMIQUAVERS`}
                            names={`HANNA P
                            AJIN J
                            SERENA N
                            ANDY L
                            STEPHANIE S
                            MAHIMA Y
                            WYETH M`}
                        />
                        <ListDecomposed
                            label='JLS ORCH'
                            names={`CLAIRE W
                            ERIC F
                            JOSHUA L
                            PARKER W`}
                        />
                        <ListDecomposed
                            names={`ABBY K
                            AMITA G
                            ASHLEY S
                            JUSTIN Y
                            ALBERT J
                            REINA K`}
                        />
                        <ListDecomposed
                            names={`ALMA C
                            VIVIAN T
                            AUDRY D
                            JENNIE F
                            BOGIE K
                            MICHELLE L
                            STEVEN L
                            RICHARD L
                            MICHELLE P
                            KEIRA P
                            ETHAN Z
                            ARIEL A`}
                        />
                        <ListDecomposed
                            names={`MS. MCGUIRE`}
                        />
                        <ListDecomposed
                            label='STAGE TECH'
                            names={`DANIELLE M
                            ANNA T
                            EBRU H
                            HILA L
                            ALISHA B
                            DIANA
                            AMELIA
                            ABIGAIL F
                            KRISHNA
                            JENNY M`}
                        />
                        <ListDecomposed
                            names={`BANKS H
                            KATEL F
                            OCTAVIUS D
                            EMMA E
                            EMMA G
                            SOFIA H
                            MIKE K
                            PALINA K
                            ATHYA P
                            JOHANNAH S
                            YUNA S
                            SAFINA S
                            PHOEBE B
                            OREN S
                            ZINA Z
                            GEORGIA G`}
                        />
                        <ListDecomposed
                            names={`MR. MAHLE
                            DAN N
                            KEN`}
                        />
                    </div>
                </div>
                <div>
                    <p>my parents, my sister, my family, and family friends</p>
                    <br></br>
                    <p>and all those I&apos;m sorry I forgot,<br></br>lost to time,<br></br>but have made me who I am in the same way as everyone else.</p>
                    <br></br>
                    <br></br>
                    <p>... thank you for everything</p>
                </div>
                <div ref={placeholderref} className={style.splashplaceholder}>

                </div>
            </div>
            <div className={style.bg}>
                <motion.div
                    style={{ opacity: scrollYProgress }}>
                    <Image src={yourname}
                        alt="The comet from Your Name blazes towards the setting sun in the horizon, its tail shining against a star-speckled night sky." />
                </motion.div>
            </div>
        </div>
    )

}