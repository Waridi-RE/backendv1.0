import {
 PrimaryGeneratedColumn, Entity, Column
} from 'typeorm';

@Entity()

class Commerce {
@PrimaryGeneratedColumn('uuid')
id: String

@Column({length: 50})
seller_name: String

@Column({length: 50})
item_name: String

@Column({length: 50})
imageURL: String

@Column({length: 50})
public_id: String
}

export {Commerce};
