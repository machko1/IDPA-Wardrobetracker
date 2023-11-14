using my.wardrobe as my from '../db/data-model';

service CatalogService {
    entity Wardrobe as projection on my.Wardrobe;
    entity MediaFile as projection on my.MediaFile;
}
