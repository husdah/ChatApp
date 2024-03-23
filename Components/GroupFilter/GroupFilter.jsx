import React,{useState, useContext, useEffect} from "react";
import Image from 'next/image';
import Link from 'next/link';

//INTERNAL IMPORT
import Style from './GroupFilter.module.css';
import images from '../../assets';
import { ChatAppContext } from '../../Context/ChatAppContext';

const GroupFilter = () => {
  const { searchGroupList } = useContext(ChatAppContext);
  const [search, setSearch] = useState('');

  useEffect(() => {
    searchGroupList(search);
  }, [search]);

  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={20} height={20} />
            <input 
              type="text" 
              placeholder="searc.."
              value={search}
              onChange={e => setSearch(e.target.value)} 
            />
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <Link href="/addGroup">
            <button>
              <Image src={images.user} alt="user" width={20} height={20} />
              CREATE GROUP
            </button>
          </Link>
          <Link href="/">
            <button>
              <Image src={images.account} alt="group" width={20} height={20} />
              SINGLE CHAT
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
};

export default GroupFilter;
