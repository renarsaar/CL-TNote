import './style.scss'

type Props = {}

export default function About({ }: Props) {
  return (
    <>
      <h3>About TakeNote</h3>

      <p>
        TakeNote is a minimalist note-taking web app for developers. Write in plain text or Markdown in an IDE-like environment.
      </p>

      <p>
        This app has no tracking or analytics and does not retain any user data. Notes are persisted in local storage and can be downloaded as Markdown files from the data management tab.
      </p>

      <p>
        TakeNote was created by <a href='https://github.com/renarsaar' target='_blank' rel='noreferrer'>Renar Saaremets</a>.
      </p>
      <p>
        <a className='icon-button' href='https://github.com/renarsaar/CL-TNote' target='_blank' rel='noreferrer'>
          View source
        </a>
      </p>
    </>
  )
}