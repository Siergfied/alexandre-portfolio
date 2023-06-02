import { db } from '../firebase.js';
import { doc, updateDoc } from 'firebase/firestore';

export default class Order {
	static async onNew(collectionArray, collection, order) {
		collectionArray.forEach(async (element) => {
			if (element.order >= order) {
				element.order++;
				await updateDoc(doc(db, collection, element.id), element);
			}
		});
	}

	static async onUpdate(collectionArray, collection, orderNew, orderOld) {
		if (orderNew > orderOld) {
			collectionArray.forEach(async (element) => {
				if (element.order > orderOld && element.order <= orderNew) {
					element.order--;
					await updateDoc(doc(db, collection, element.id), element);
				}
			});
		}

		if (orderNew < orderOld) {
			collectionArray.forEach(async (element) => {
				if (element.order < orderOld && element.order >= orderNew) {
					element.order++;
					await updateDoc(doc(db, collection, element.id), element);
				}
			});
		}
	}

	static async onDelete(collectionArray, collection, order) {
		collectionArray.forEach(async (element) => {
			if (element.order > order) {
				element.order--;
				await updateDoc(doc(db, collection, element.id), element);
			}
		});
	}
}
