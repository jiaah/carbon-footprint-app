import React from 'react';

/* -- Import image files -- */
import '../../assets/svg/facebook.svg';
import '../../assets/svg/twitter.svg';
import '../../assets/svg/linkedin.svg';
import '../../assets/svg/mail.svg';
import '../../assets/svg/lock.svg';
import '../../assets/svg/info.svg';


const Ul = ({ list, links }) => (

  <ul className="flex trip--title-ul">
    {
      list && list.map(e => (
        <li className={e.classname} key={e.id}>{e.name}</li>
      ))
    }
    {
      links && links.map(e => (
        <a key={e.id} className={e.classname} href={e.href} target="_blank" rel="nofollow">
          <img src={e.src} alt={e.alt} height={e.height} width={e.width} className={e.imgClassname} />
          <span className="icon--text-span white">{e.title}</span>
        </a>
      ))
    }{}
  </ul>
);

export default Ul;
