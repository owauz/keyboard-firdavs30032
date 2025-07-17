import { useState } from 'react'
import fetchData from '../../services'

export default function Header() {
    const [userData, setUserData] = useState(null)
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")

    const fetchUser = () => {
        fetchData(`https://api.dictionaryapi.dev/api/v2/entries/en/${username}`)
            .then((data) => {
                setUserData(data[0])
                setError("")
            })
            .catch(() => {
                setUserData(null)
                setError("Word not found or API error.")
            })
    }

    const handleSearch = () => {
        if (username.trim()) {
            fetchUser()
        }
    }

    return (
        <header>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter word..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <img
                    src="img/search.svg"
                    alt="Search icon"
                    onClick={handleSearch}
                    style={{ cursor: 'pointer' }}
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userData && (
                <div className='aboutt'>
                    <div className="h1-audio">
                        <h1>{userData.word}</h1>
                        {(() => {
                            const audioUrl = userData.phonetics.find(p => p.audio)?.audio
                            return audioUrl ? (
                                <>
                                    <audio id="audio" src={audioUrl}></audio>
                                    <img
                                        src="img/audio.svg"
                                        alt="Play pronunciation"
                                        onClick={() => document.getElementById('audio')?.play()}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </>
                            ) : null
                        })()}
                    </div>
                    <h3>{userData.phonetic}</h3>
                    <div className="abouts">
                        {userData.meanings
                            .filter(item => item.partOfSpeech === "noun" || item.partOfSpeech === "verb")
                            .map((item2, idx) => (
                                <div key={idx}>
                                    <div className="line">
                                        <h4 className="h4">{item2.partOfSpeech}</h4>
                                        <img src="img/line-long.svg" alt="line" />
                                    </div>
                                    <div className="about">
                                        <div className='definition'>
                                            <h3 className='definition-h3' >Meaning</h3>
                                            <ul>
                                                {item2.definitions.slice(0, 3).map((item3, index) => (
                                                    <>
                                                        <li className='about-li' key={index}>{item3.definition}</li>
                                                        <p className='about-p'>"{item3.example}"</p>
                                                    </>
                                                ))}
                                            </ul>
                                        </div>
                                        {item2.partOfSpeech === "noun" && item2.synonyms.length > 0 && (
                                            <div className='about-word'>
                                                <h3 className='about-h3'>Synonyms</h3>
                                                <ul>
                                                    {item2.synonyms.map((itemss) => (
                                                        <p className='about-word-p'>{itemss}</p>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <hr style={{marginTop:"20px"}}/>
                        {userData.phonetics[1]?.sourceUrl && (
                            <p className='source-p'>
                                Source <a href={userData.phonetics[1].sourceUrl} target="_blank" rel="noopener noreferrer">
                                    {userData.phonetics[1].sourceUrl}
                                </a>
                            </p>
                        )} 
                    </div>
                </div>
            )}
        </header>
    )
}