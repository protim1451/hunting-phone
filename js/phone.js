const loadPhone = async (searchText ='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    //console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    //console.log(phones);
    const phoneContainer = document.getElementById('phone-container');

    // Clear container
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    //console.log('is show all', isShowAll);
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
   

    phones.forEach(phone => {
        //console.log(phone);
        // create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
        phoneCard.innerHTML = `
    <figure><img src="${phone.image}" /></figure>
    
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    
                    <div class="card-actions justify-center">
                        <button onclick="handleShowDetail('${phone.slug}');" 
                        class="btn btn-primary">Show Details</button>
                    </div>
                </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}

const handleShowDetail =async (id) => {
    //console.log('Clicked show details', id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;


    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" />
    <p><span>Brand: </span>${phone.brand}</p>
    <p><span>Storage: </span>${phone.mainFeatures.storage}</p>
    <p><span>Chipset: </span>${phone.mainFeatures.chipSet}</p>
    <p><span>Display: </span>${phone.mainFeatures.displaySize}</p>
    <p><span>Release: </span>${phone.releaseDate}</p>
    <p><span>GPS: </span>${phone?.others?.GPS || 'No GPS'}</p>
    ` 
    my_modal_5.showModal();
}
// Handle Search Button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    //console.log('Search handle');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}
// Handle Show All

const handleShowAll = () => {
    handleSearch(true);
}
loadPhone();