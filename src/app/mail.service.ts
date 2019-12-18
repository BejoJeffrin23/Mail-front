import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MailService {

   private url = 'http://localhost:4001/api/v1/users';


  constructor(
    public http: HttpClient
  ) { }

  //function to get data from cookies
  public getUserInfoInLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'))
  }

  //function to save data from cookies
  public setUserInfoInLocalStorage = (data) => {

    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  //start of signup function
  public signinFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.url}/login`, params);
  } 
  // end of signinFunction function

  public send(data): Observable<any> {

    const form = new FormData()
      form.append('name', data.senderName)
      form.append('senderMail', data.senderMail)
      form.append('recieverMail',data.recieverMail)
      form.append('title',data.title)
      form.append('content',data.content)
      form.append('subject',data.subject)
      form.append('image',data.image,data.name)

    return this.http.post(`${this.url}/send`,form);
  } 

  public reply(data): Observable<any> {

    const form = new FormData()
    form.append('id',data.id)
      form.append('name', data.senderName)
      form.append('senderMail', data.senderMail)
      form.append('recieverMail',data.recieverMail)
      form.append('title',data.title)
      form.append('content',data.content)
      form.append('subject',data.subject)
      form.append('image',data.image,data.name)

    return this.http.post(`${this.url}/reply`,form);
  } 

  public logout(): Observable<any> {
    const params = new HttpParams()
      .set('authToken', Cookie.get('authToken'));

    return this.http.post(`${this.url}/logout?authToken=${Cookie.get('authToken')}`, params);

  } // end logout function
  public getMails(data):any{
    console.log(data)
    let datas=this.http.get(`${this.url}/${data}/all`)
    return datas;
  }

  public sentMails(data):any{
    console.log(data)
    let datas=this.http.get(`${this.url}/${data}/sentMail`)
    return datas;
  }

  public getTrash(data):any{
    console.log(data)
    let datas=this.http.get(`${this.url}/${data}/getTrash`)
    return datas;
  }

  public draft(data): Observable<any> {

    const params = new HttpParams()
      .set('name', data.senderName)
      .set('senderMail', data.senderMail)
      .set('recieverMail',data.recieverMail)
      .set('title',data.title)
      .set('content',data.content)
      .set('subject',data.subject)

    return this.http.post(`${this.url}/draft`, params);
  } 
  public viewDraft(data): Observable<any> {
console.log(data)
    const params = new HttpParams()
    .set('id',data.id)
      .set('name', data.senderName)
      .set('recieverMail',data.recieverMail)
      .set('title',data.title)
      .set('content',data.content)
      .set('subject',data.subject)

    return this.http.post(`${this.url}/viewDraft`, params);
  } 


  public getDraft(data):any{
    console.log(data)
    let datas=this.http.get(`${this.url}/${data}/getDraft`)
    return datas;
  }

  public viewInboxMail(data):any{
    console.log(data)
    let datas=this.http.get(`${this.url}/${data}/viewMailInbox`)
    return datas;
  }

  public viewMail(data):any{
    console.log(data)
    let datas=this.http.get(`${this.url}/${data}/viewMail`)
    return datas;
  }

  public viewTrashMail(data):any{
    console.log(data)
    let datas=this.http.get(`${this.url}/${data}/viewTrashMail`)
    return datas;
  }


  
  public delete(data):any{
    let datas=this.http.get(`${this.url}/${data}/trash`)
    return datas;
  }

  public deletePermanent(id){
    const params = new HttpParams()
.set('id',id)
return this.http.post(`${this.url}/removePermanent`, params);

  }


  public deleteDraft(id){
    const params = new HttpParams()
.set('id',id)
return this.http.post(`${this.url}/deleteDraft`, params);

  }
}