export default function Resume() {
    const style = {
        height: 'calc(100vh - var(--navbarheight))',
        width: '70vw',
        'max-width': '100%',
        'padding': '2vh'
    }

    return (
        <div style={style}>
            <iframe
                style={ {height: '100%', width: '100%', border:'none'} }
                src="https://drive.google.com/file/d/1Q7Qx_Jf8HrozV9UFJvdy2-JqyZ6Tpnbh/preview#view=FitH&scrollbar=0&zoom=50" allow="autoplay"></iframe>
        </div>
    )
}