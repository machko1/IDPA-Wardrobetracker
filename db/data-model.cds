namespace my.wardrobe;

@Capabilities: {
  InsertRestrictions.Insertable: true,
  UpdateRestrictions.Updatable : true,
  DeleteRestrictions.Deletable : true
}
entity Wardrobe {
  key ID          : Integer;
      name        : String;
      brand       : String;
      color       : String;
      size        : String;
      price       : Double;
      season      : String;
      currency    : String;
      image       : String;
      type        : String;
      designer    : String;
      description : String;
}
