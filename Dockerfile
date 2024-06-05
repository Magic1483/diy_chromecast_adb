FROM python:3.11.0

#Исполняется при сборке образа
COPY . .
RUN apt-get update 
RUN apt-get -y upgrade 
RUN apt-get -y install  android-tools-adb 
RUN pip install --no-cache-dir -r req.txt
EXPOSE 8800 5555
#Исполняется при запуске образа

CMD ["python","chromecast_diy.py"]