
import './App.css'
import VideoAnimation from './Components/VideoAnimation'

function App() {

  return (
    <>
      <VideoAnimation /> 
      <section className="next-section">
        <h2>Your Next Content</h2>
        <p>This appears smoothly after the video "ends."</p>
      </section>
    </>
  )
}

export default App
