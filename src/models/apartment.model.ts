import  {
    pre,
    index,
    prop,
    modelOptions,
    getModelForClass,
    DocumentType,
} from "@typegoose/typegoose";


@modelOptions({
    //Add timestamp to your model
    schemaOptions: {
        timestamps: true,
    },
})

export class Apartment {
  @prop()
  apartmant_name: string;

  @prop()
  aparment_location: string;

  @prop()
  aparment_description: string;

  @prop()
  imageURL: string;

  @prop()
  public_id: string;
}

const apartmentModel = getModelForClass(Apartment);

export default apartmentModel;
