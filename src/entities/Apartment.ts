import {
 Entity, PrimaryColumn, Column, PrimaryGeneratedColumn
} from 'typeorm';

@Entity()

class Apartment {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column({length: 50})
 apartment_name: string;

 @Column({length: 50})
 location: string;

 @Column({length: 100})
 description: string;

@Column({length: 50})
imageURL: string

@Column({length: 50})
public_id: string

}

export {Apartment}
