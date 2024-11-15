// import { useState, useEffect, useRef } from 'react';
// import 'animate.css'; // 引入 animate.css 样式
// import { VariableSizeList as List } from 'react-window'; // 使用 react-window 虚拟化列表
// import './ComplexList.scss'; // 引入自定义的样式

// // mockData.js
// const mockGetPosts = (count = 30) => {
//     return new Array(count).fill(null).map((_, index) => ({
//         id: index + 1,
//         content: `Post ${index + 1}`,
//     }));
// };

// const ComplexList = () => {
//     const [posts, setPosts] = useState(mockGetPosts(100)); // 使用 state 存储 posts


//     // 渲染列表项时触发动画
//     const renderRow = ({ index, style }) => {
//         const itemRef = useRef(null);

//         // 观察器回调
//         const onIntersection = (entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     entry.target.classList.add('animate__fadeInUp'); // 进入视口时触发动画
//                     entry.target.classList.add('animate__animated'); // 添加动画类
//                 }
//             });
//         };

//         // 在组件挂载时初始化 IntersectionObserver
//         useEffect(() => {
//             const currentRef = itemRef.current;

//             // 仅当 itemRef.current 不为 null 时才初始化 IntersectionObserver
//             if (currentRef) {
//                 const observer = new IntersectionObserver(onIntersection, {
//                     rootMargin: '0px', // 设置视口与元素的距离，0px 表示元素出现在视口内即可触发
//                     threshold: 0.1, // 元素至少有10%可见时触发
//                 });

//                 observer.observe(currentRef); // 开始观察当前项

//                 // 清理函数：在组件卸载时解除观察
//                 return () => {
//                     if (currentRef) {
//                         observer.unobserve(currentRef); // 解除观察
//                     }
//                 };
//             }
//             console.log('currentRef is null', index);
//         }, [index]); // 每次 `index` 更新时重新设置观察器

//         return (
//             <>

//                 <div
//                     ref={itemRef} // 绑定 ref 到该列表项
//                     style={{
//                         ...style,
//                         top: style.top

//                     }} // 必须传递 style 来正确渲染 react-window 列表项
//                     className="post wow" // 使用 WOW.js 类（如果需要）
//                     data-wow-duration="1s"
//                     data-wow-delay={`${index * 0.5}s`}
//                 >

//                     <div className="post-content">
//                         <div
//                             data-wow-duration="1s"
//                             data-wow-delay={`${index * 0.5}s`}
//                             className='wow animate__fadeInRight'
//                         >
//                             {posts[index].id}
//                         </div>
//                         {posts[index].content}
//                     </div>
//                 </div>
//             </>
//         );
//     };

//     return (
//         <div className="post-list">
//             <List
//                 height={500} // 设置列表的高度
//                 itemCount={posts.length}
//                 itemSize={() => 100} // 使用动态高度的函数
//             // width={300} // 设置列表宽度
//             >
//                 {renderRow}
//             </List>
//         </div>
//     );
// };

// export default ComplexList;
import { useState, useEffect, useRef } from 'react';
import 'animate.css'; // 引入 animate.css 样式
import { VariableSizeList as List } from 'react-window'; // 使用 react-window 虚拟化列表
import './ComplexList.scss'; // 引入自定义的样式

// mockData.js
const mockGetPosts = (count = 100) => {
    return new Array(count).fill(null).map((_, index) => ({
        id: index + 1,
        content: `Post ${index + 1}`,
    }));
};

const ComplexList = () => {
    const [posts, setPosts] = useState(mockGetPosts(100)); // 使用 state 存储 posts
    const itemRefs = useRef([]); // 创建一个数组来存储每个项的 ref
    // 动态计算每个项的高度（固定高度示例）
    const getItemSize = () => 100;

    return (
        <div className="post-list">
            <List
                height={500} // 设置列表的高度
                itemCount={posts.length}
                itemSize={getItemSize} // 使用动态高度的函数
            >
                {/* {renderRow} */}
                {({ index, style }) => (
                    <Item
                        index={index}
                        style={style}
                        posts={posts}
                        itemRefs={itemRefs}
                    />
                )}
            </List>
        </div>
    );
};

const Item = ({ index, style, posts, itemRefs }) => {
    const post = posts[index];
    const itemRef = useRef(null); // 通过 index 创建每个项的 ref

    // 确保每个 ref 被存储到 itemRefs 数组中
    useEffect(() => {
        itemRefs.current[index] = itemRef.current;
    }, [index]);


    const onIntersection = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 获取目标元素的指定 id 的子元素
                const targetElement = entry.target;

                // 假设我们想获取 id 为 "aaa" 的子元素
                const aaa = targetElement.querySelector('#aaa');
                // 检查是否找到了指定的子元素
                if (aaa) {
                    // 为指定的子元素添加动画类
                    aaa.classList.add('animate__fadeInRight');
                    aaa.classList.add('animate__animated');
                } else {
                    console.log('未找到指定的子元素');
                }

                // 假设我们想获取 id 为 "aaa" 的子元素
                const bbb = targetElement.querySelector('#bbb');
                // 检查是否找到了指定的子元素
                if (bbb) {
                    // 为指定的子元素添加动画类
                    bbb.classList.add('animate__fadeInLeft');
                    bbb.classList.add('animate__animated');
                } else {
                    console.log('未找到指定的子元素');
                }


                // 你还可以为父元素本身或者其他子元素添加动画类
                targetElement.classList.add('animate__fadeInUp');
                targetElement.classList.add('animate__animated');
            }
        });
    };


    // 在组件挂载时初始化 IntersectionObserver
    useEffect(() => {
        const currentRef = itemRef.current;

        if (currentRef) {
            const observer = new IntersectionObserver(onIntersection, {
                rootMargin: '0px',
                threshold: 0.2,
            });

            observer.observe(currentRef); // 开始观察当前项

            // 清理函数：在组件卸载时解除观察
            return () => {
                if (currentRef) {
                    observer.unobserve(currentRef); // 解除观察
                }
            };
        }
    }, [post.id]); // 每次 `post.id` 更新时重新设置观察器

    return (
        <div
            ref={itemRef} // 绑定 ref 到该列表项
            style={style} // 必须传递 style 来正确渲染 react-window 列表项
            className="post"
            data-id={post.id} // 给每个列表项一个唯一的 id 用于 IntersectionObserver
        >
            <div className="post-content">
                <div id='aaa'>
                    {post.id}
                </div>
                <div id='bbb'>
                    {post.content}
                </div>
            </div>
        </div>
    );
}
export default ComplexList;
