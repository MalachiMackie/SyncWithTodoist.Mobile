import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular'

import { NewProjectPage } from '../new-project/new-project.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public alertController: AlertController, public modalController: ModalController) {}

  public async newProject() {

    const newProjectModal = await this.modalController.create({
      component: NewProjectPage
    })

    return await newProjectModal.present();

    const newProjectAlert = await this.alertController.create({
      header: 'New Project',
      inputs: [{
        type: 'textarea',
        name: 'projectName',
        placeholder: 'My New Project'
      }]
    });

    newProjectAlert.present();
  }
}
