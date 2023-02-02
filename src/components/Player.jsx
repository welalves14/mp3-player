import { useRef, useState, useEffect } from "react"
import napster from "../services/napster"

function Player({ song }) {

    const [isPlaying, setIsPlaying] = useState(false)
    const [tracks, setTracks] = useState([])
    const [currentIndex, setCurrentIndex] = useState(1)
    const music = useRef()
    const key = "ZTVhYTU3MWEtZjRhNy00MmRmLWJiZDAtNjQwNTAwN2E0ODhi"

    useEffect(() => {
        getMusics()
    }, [])

    useEffect(() => {
        
    }, [currentIndex])

    const getMusics = async () => {
        let musics = await napster.get(`top?apikey=${key}`).then(r => r)
        setTracks(musics.data.tracks)
    }

    const loadSong = () => {
        music.current.src = tracks[currentIndex]?.previewURL
        //music.current.src = tracks[currentIndex]
        play()
    }

    const play = () => {
        music.current.play()
        setIsPlaying(true)
    }

    const pause = () => {
        music.current.pause()
        setIsPlaying(false)
    }

    const next = () => {
        setCurrentIndex(i => i > 19 ?  0 : i + 1)
        //play(currentIndex)
        loadSong()
    }

    const prev = () => {
        setCurrentIndex(i => i < 0 ?  19 : i - 1)
        loadSong()
    }

    return (
        <div>
            
            {isPlaying ? (
                <>
                <h1>{currentIndex}</h1>
                <h2>Está tocando a música: {tracks[currentIndex-1].name}  numero: {currentIndex-1}</h2>
                <h2>Está tocando a música: {tracks[currentIndex-1].artistName}</h2>
                </>
            
            ) : (
                <h2>A música está parada</h2>
            )}
            <h1>{currentIndex}</h1>
            <audio ref={music} src={song?.music || tracks[0]?.previewURL} ></audio>
            <button onClick={ prev }>Anterior</button>
            <button onClick={ isPlaying ? pause : play}>
                { isPlaying ? "pause" : "play"}
            </button>
            <button onClick={ next }>Próximo</button>
        </div>
    )
}

export default Player