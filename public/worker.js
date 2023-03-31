//
self.addEventListener("push", (e) => {

    const data = e.data.json()

    // this is to send notifications on the Chrome browser.
    // Every browser has different configuration settings.
    self.registration.showNotification(
        data.title,
        {
            body: data.body,
            image: data.image,
            icon: data.image
        }
    )
})