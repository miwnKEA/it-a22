from flask import Flask, render_template, redirect

app = Flask(__name__)

pageDays = [
    [1, 1, 'Introduktion til Raspberry Pi'],
    [2, 1, 'Client-server arkitektur og webapplikationer med Flask'],
    [3, 0, 'Computernetværk, servere og Cloud-infrastruktur'],
    [4, 0, 'Femlagsmodellen og netværksprotokoller'],
    [5, 0, 'Femlagsmodellen med fokus på applikationslaget'],
    [6, 0, 'Sikkerhed i webapplikationer'],
    [7, 0, 'Sikkerhed og kryptografi'],
    [8, 0, 'Sikkerhed i computernetværk'],
    [9, 0, 'IT-governance']
]

# inject context processer to all pages
# injects variables into the context of a page
@app.context_processor
def inject_page_days():
    return dict(pageDays=pageDays)

@app.route('/')
def index():
    pageTitle = 'Informationsteknologi'
    pageDescription = '''Informationsteknologi introducerer dig til metoder og processer indenfor udvikling af netværksapplikationer.
    Det kræver en grundlæggende forståelse af komponenter, arkitekturer og protokoller til opbygning af computernetværk og netværksapplikationer.
    Det vil give dig en forståelse for computersystemers tekniske muligheder og begrænsninger.
    Faget involverer også IT-governance, der vil indføre dig i problematikker omkring styring og sikring af systemer.'''
    return render_template('index.html', pageTitle=pageTitle, pageDescription=pageDescription, pageDays=pageDays)

@app.route('/<int:day>')
def dayPage(day):
    for d in pageDays:
        if d[0] == day:
            return render_template(str(day) + '.html', d=d)
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
