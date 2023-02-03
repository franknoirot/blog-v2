import { useEffect, useRef, useState } from "react";

export default function RightClickVisualizer() {
    const [prompt, setPrompt] = useState('')
    const [image, setImage] = useState('')
    const [submissionStatus, setSubmissionStatus] = useState('unsent')
    const imageLoaded = useRef(false)
    const [submissionsRemaining, setSubmissionsRemaining] = useState(Infinity)

    useEffect(() => {
        document.addEventListener('selectionchange', e => {
          const selectedText = document.getSelection()
    
          if (imageLoaded.current) {
            return
        } else if (!selectedText || selectedText == null || selectedText.type == "Caret" || selectedText.type == "None") {
            setPrompt('')
        } else {
              setPrompt(selectedText.toString())
          }

        })
      }, [submissionStatus])

        async function submitGptPrompt() {
            console.log('submitting!', prompt)
            if (!prompt) return
            // set loading state
            setSubmissionStatus('loading')
            
            // submit to the API
            const res = await fetch('/api/visualizeText', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                prompt,
              })
            })

            // get result
            if (res.status == 429) {
                setSubmissionsRemaining(0)
                imageLoaded.current = true
                setSubmissionStatus('rateLimited')
            } else {
                const data = await res.json()

                console.log(data)
                
                // set remaining attempts
                setSubmissionsRemaining(data?.remaining)
                setImage(data?.image?.url)
                imageLoaded.current = true
                setSubmissionStatus('complete')
            }

        }

        const canSubmit = submissionStatus !== 'complete' && submissionsRemaining > 0

        function handleClick() {
            if (canSubmit) submitGptPrompt()
            else {
                setSubmissionStatus('unsent')
                imageLoaded.current = false
                setPrompt('')
                setImage('')
            }
        }

      return <div className={"px-4 py-2 max-w-sm rounded-md fixed bottom-8 left-8 "
        + ((prompt || submissionStatus == 'complete') ? "block " : "hidden ")
        + ((submissionsRemaining > 0) ? 'bg-green-200 text-green-800 ' : 'bg-red-200 text-red-800 ')}>
        {image && <div className="grid w-64 h-64 mx-auto rounded bg-blue-50 place-items-center place-content-center">
            <img src={image} alt={`"${prompt}", as rendered by DALL-E 2.`} />
        </div>}
        <span>&quot;{prompt}&quot;</span>
        <button className={"flex items-center justify-center gap-2 w-full py-1 px-2 mt-2 " + ((submissionsRemaining > 0) ? 'bg-green-700 rounded hover:bg-green-800 text-green-50 ' : 'bg-red-700 rounded hover:bg-red-800 text-red-50 ')}
            onClick={handleClick}
            disabled={submissionStatus === 'loading'}>
            {(submissionStatus === 'loading') && 
            <div className="flex items-center justify-center">
                <div className="inline-block w-3 h-3 rounded bg-slate-900 border-3 animate-spin" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
            </div>}
            {(canSubmit) ? `Visualize with DALL-E 2` : 'Close Viewer'}
        </button>
        {(submissionsRemaining >= 0 && submissionsRemaining < Infinity) &&
            <p className="text-center"><small>You have <strong>{submissionsRemaining}</strong> highlights remaining today.</small></p>
        }
        {(submissionStatus === 'rateLimit') && <p><strong>Hey!</strong> don&apos;t abuse my API feature punk!</p>}
      </div>
}