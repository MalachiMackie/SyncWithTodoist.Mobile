import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { NewProjectPage } from '../new-project/new-project.page';
import { ProjectsPage } from '../projects/projects.page';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	constructor(
		public alertController: AlertController,
		public modalController: ModalController
	) {}

	newProjectModal: HTMLIonModalElement;

	public async viewProjects() {
		this.newProjectModal = await this.modalController.create({
			component: ProjectsPage,
			componentProps: {
				onFinished: () => this.newProjectModal.dismiss(),
			},
		});

		return await this.newProjectModal.present();
	}

	public async newProject() {
		this.newProjectModal = await this.modalController.create({
			component: NewProjectPage,
			componentProps: {
				onFinished: () => this.newProjectModal.dismiss(),
			},
		});

		return await this.newProjectModal.present();
	}
}
