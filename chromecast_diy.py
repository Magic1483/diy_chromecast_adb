from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import subprocess
from fastapi.responses import PlainTextResponse

# https://gomakethings.com/four-different-ways-to-inject-text-and-html-into-an-element-with-vanilla-javascript/
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/cast')
async def translate_req(req:Request):
    res = await req.json()
    print('open video with url: ',res['url'] ,'dest_ip',res['dest_url'])
    try:
        subprocess.run(f'adb connect {res["dest_url"]}:5555',shell=True)
    except:pass

    subprocess.run(f'adb shell am start -a android.intent.action.VIEW -d "{res["url"]}"',shell=True)
    return 'OK'

@app.get('/kill', response_class=PlainTextResponse)
async def translate_req(req:Request):
    

    return "Hi bro, what's happen?"

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8800)