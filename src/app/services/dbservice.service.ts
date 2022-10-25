import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Asistencia } from '../clases/asistencia';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  public database: SQLiteObject;
  tblAsistencias: string = "CREATE TABLE IF NOT EXISTS asistencia(id INTEGER PRIMARY KEY autoincrement, idAlumno INTEGER NOT NULL, ramo VARCHAR(100) NOT NULL, fecha VARCHAR(50) NOT NULL);";

//   export class Asistencia {
//     id: number;
//     idAlumno: number;
//     ramo: string;
//     fecha: string;
// }
  listaAsistencias = new BehaviorSubject([]);
  private isDbReady:
    BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite,
    private platform: Platform,
    public toastController: ToastController) {
      // this.presentToast('holi')
      this.crearBD();
  }
  crearBD() {
    this.platform.ready().then(() => {
      // this.presentToast('primer step');
      this.sqlite.create({
        name: 'asistencia.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        // this.presentToast('segundo step');
        this.database = db;
        // this.presentToast("BD creada");
        this.crearTablas();
      }).catch(e => this.presentToast(e));
    })
  }
  async crearTablas() {
    // this.presentToast('cero step');
    try {
      await this.database.executeSql(this.tblAsistencias,[]);
      // this.presentToast("Tabla creada");
      this.cargarAsistencias();
      this.isDbReady.next(true); 
    } catch (error) {
      this.presentToast("Error en Crear Tabla: "+error);
    }
  }

  cargarAsistencias() {
    return this.database.executeSql('SELECT * FROM asistencia',[])
    .then(res=>{
      let items:Asistencia[]=[];
      if(res.rows.length>0){
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id:res.rows.item(i).id,
            idAlumno:res.rows.item(i).idAlumno,
            ramo:res.rows.item(i).ramo,
            fecha:res.rows.item(i).fecha
          });          
        }
      }
      this.listaAsistencias.next(items);
    });
  }

  addAsistencia(idAlumno,ramo,fecha){
    let data=[idAlumno,ramo,fecha];
    return this.database.executeSql('INSERT INTO asistencia(idAlumno,ramo,fecha) VALUES(?,?,?)',data)
    .then(()=>{
      this.cargarAsistencias();
    });
  }
  updateAsistencia(id,idAlumno,ramo,fecha){
    let data=[id,idAlumno,ramo,fecha];
    return this.database.executeSql('UPDATE asisntecia SET idAlumno=?, ramo=?, fecha=? WHERE id=?',data)
    .then(()=>{
      this.cargarAsistencias();
    });
  }
  deleteAsistencia(id){
    return this.database.executeSql('DELETE FROM asistencia WHERE id=?',[id])
    .then(()=>{
      this.cargarAsistencias();
    });
  }
  dbState(){
    return this.isDbReady.asObservable();
  }

  fetchAsistencias(): Observable<Asistencia[]> {
    return this.listaAsistencias.asObservable();
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
