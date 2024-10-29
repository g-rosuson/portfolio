/**
 * Adds a carousel ID to the list of persisted carousel IDs in session storage.
 * If the list does not already exist, it initializes a new array. The updated
 * list is then saved back to session storage under the key 'carousel-playlist'.
 */
const addCarouselToList = (carouselId: string) => {
    const persistedCarouselIds = sessionStorage.getItem('carousel-playlist');
    const carouselIds = persistedCarouselIds ? JSON.parse(persistedCarouselIds) : [];
    carouselIds.push(carouselId);

    sessionStorage.setItem('carousel-playlist', JSON.stringify(carouselIds));
};

/**
 * Checks if a given carousel ID exists in the list of persisted carousel
 * IDs stored in session storage.
 */
const isCarouselOnList = (carouselId: string) => {
    const carouselReplayList = sessionStorage.getItem('carousel-playlist');
    const carouselIds = carouselReplayList ? JSON.parse(carouselReplayList) : null;

    return !!carouselIds && carouselIds.some((id:string) => id === carouselId);
};

const storage = {
    addCarouselToList,
    isCarouselOnList
};

export default storage;