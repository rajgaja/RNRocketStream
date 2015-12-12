/*
* date : developer : change comment
* Dec 13,2015  rajkumar  Adding the first meteor collection
* 
*/

class MeteorCollection {
    subscribe(subscriptionName, params) {
        return ddpClient.subscribe(subscriptionName, params);
    }
    observe(callback) {
        let observer = ddpClient.connection.collections.observe(() => {
            return ddpClient.connection.collections.lists.find();
        });
        observer.subscribe((results) => {
            callback(results);
        });
    }
}
